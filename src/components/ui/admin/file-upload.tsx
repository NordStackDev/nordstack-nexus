import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
	initial: {
		x: 0,
		y: 0,
	},
	animate: {
		x: 20,
		y: -20,
		opacity: 0.9,
	},
};

const secondaryVariant = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
};

export const FileUpload = ({
	onChange,
}: {
	onChange?: (files: File[]) => void;
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (newFiles: File[]) => {
		// forward files to parent, don't keep local previews
		onChange && onChange(newFiles);
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const { getRootProps, isDragActive } = useDropzone({
		multiple: true,
		noClick: true,
		onDrop: handleFileChange,
		onDropRejected: (error) => {
			console.log(error);
		},
	});

	return (
		<div className="w-full" {...getRootProps()}>
			<motion.div
				onClick={handleClick}
				whileHover="animate"
				className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
			>
				<input
					ref={fileInputRef}
					id="file-upload-handle"
					type="file"
					onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
					className="hidden"
				/>
					 {/* background removed to avoid inner highlight */}
	<div className="flex flex-col items-center justify-center">
					<p className="relative z-20 font-sans font-semibold text-[#FFD700] dark:text-neutral-300 text-base">
						Upload filer
					</p>
					<p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
						Drag and drop dine filer, eller åben din fil ved at klikke her.
					</p>
					<div className="relative w-full mt-10 max-w-xl mx-auto">
						<motion.div
							layoutId="file-upload"
							variants={mainVariant}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 20,
							}}
							className={cn(
								"relative group-hover/file:shadow-2xl z-40 bg-transparent backdrop-blur-sm border border-neutral-800/20 flex items-center justify-center h-36 w-36 mx-auto rounded-xl",
								"shadow-[0px_30px_60px_rgba(0,0,0,0.45)]"
							)}
						>
							{isDragActive ? (
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="text-neutral-600 flex flex-col items-center"
								>
									Drop it
									<IconUpload className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
								</motion.p>
							) : (
								<IconUpload className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
							)}
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};
