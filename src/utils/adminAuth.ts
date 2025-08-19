import { supabase } from "@/integrations/supabase/client";

/**
 * Frontend example: Admin login request
 */
export const loginAsAdmin = async (email: string, password: string) => {
  try {
    // Method 1: Using the edge function for admin verification
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    const response = await fetch(`${supabaseUrl}/functions/v1/admin-verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Admin login failed');
    }

    // If successful, set the session
    if (result.session) {
      await supabase.auth.setSession(result.session);
    }

    return { success: true, user: result.user };
  } catch (error: any) {
    console.error('Admin login error:', error);
    throw error;
  }
};

/**
 * Frontend example: Regular login with role check
 */
export const loginWithRoleCheck = async (email: string, password: string) => {
  try {
    // Step 1: Authenticate with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      throw new Error(authError?.message || 'Authentication failed');
    }

    // Step 2: Check user role
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', authData.user.id)
      .maybeSingle();

    if (roleError) {
      throw new Error('Error checking user role');
    }

    const userRole = roleData?.role || 'user';
    const isAdmin = userRole === 'admin';

    return {
      user: authData.user,
      session: authData.session,
      role: userRole,
      isAdmin,
    };
  } catch (error: any) {
    console.error('Login with role check error:', error);
    throw error;
  }
};

/**
 * Check if current user is admin
 */
export const checkCurrentUserIsAdmin = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return false;
    }

    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError) {
      console.error('Role check error:', roleError);
      return false;
    }

    return Boolean(roleData);
  } catch (error) {
    console.error('Admin check error:', error);
    return false;
  }
};

/**
 * Middleware function for admin route protection
 */
export const requireAdmin = async () => {
  const isAdmin = await checkCurrentUserIsAdmin();
  
  if (!isAdmin) {
    throw new Error('Access denied: Admin privileges required');
  }
  
  return true;
};