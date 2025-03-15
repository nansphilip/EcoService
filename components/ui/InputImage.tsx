"use client";

import ImageRatio from "@comps/server/ImageRatio";
import { combo } from "@lib/combo";
import { Image as ImageTemplate, X } from "lucide-react";
import { ChangeEvent, DragEvent, InputHTMLAttributes, MouseEvent, useRef } from "react";

type InputFileProps = {
    label: string;
    variant?: "default" | false;
    onChange: (file: File | null) => void;
    imagePreview: File | null;
    classComponent?: string;
    classLabel?: string;
    classContent?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "label" | "type" | "accept" | "className" | "label" | "onChange">;

/**
 * Input image with preview
 * @example
 * ```tsx
 * // Define the state
 * const [image, setImage] = useState<File | null>(null);
 *
 * // Use the component
 * <InputImage
 *     label="Image"
 *     onChange={setImage}
 *     imagePreview={image}
 * />
 * ```
 */
export default function InputFile(props: InputFileProps) {
    const {
        label,
        variant = "default",
        onChange,
        imagePreview,
        classComponent,
        classLabel,
        classContent,
        ...others
    } = props;

    /** Ref of input image */
    const refInputImage = useRef<HTMLInputElement>(null);

    /** Do not trigger onChange event of file input when image is already set */
    const preventDefault = (e: MouseEvent<HTMLLabelElement>) => {
        if (imagePreview) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    /** Add image to parent state */
    const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (!imagePreview) onChange(e.target.files?.[0] as File);
    };

    /** Prevent default browser behavior of drag over event */
    const preventBrowserDropBehavior = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    /** Add image to parent state when dropping a file */
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!imagePreview) onChange(e.dataTransfer.files?.[0]);
    };

    /** Reset parent state and input field */
    const handleReset = () => {
        // Reset parent state
        onChange(null);
        // Reset input field
        if (refInputImage.current) {
            refInputImage.current.value = "";
        }
    };

    const theme = {
        default: {
            component: combo("block space-y-2"),
            label: combo("text-lg font-medium text-white"),
            content: combo("rounded-xl border border-dashed border-white/20 bg-white/10"),
        },
    };

    return (
        <label className={combo(variant && theme[variant].component, classComponent)} onClick={preventDefault}>
            {/* Label */}
            <div className={combo(variant && theme[variant].label, classLabel)}>{label}</div>

            {/* Content */}
            <div
                className={combo(!imagePreview && "cursor-pointer", variant && theme[variant].content, classContent)}
                onDragOver={preventBrowserDropBehavior}
                onDrop={handleDrop}
            >
                {imagePreview ? (
                    // Image preview
                    <div className="relative">
                        <ImageRatio
                            src={URL.createObjectURL(imagePreview)}
                            alt="Preview"
                            className="w-full rounded-xl"
                        />
                        <button
                            type="button"
                            onClick={handleReset}
                            className={combo(imagePreview && "cursor-pointer", "absolute right-2 top-2")}
                        >
                            <X className="size-8 text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.7)]" />
                        </button>
                    </div>
                ) : (
                    // Placeholder
                    <div className="m-5 flex flex-col items-center gap-2">
                        <ImageTemplate className="size-10 stroke-[1.5px] text-gray-400" />
                        <div className="text-center text-sm text-gray-400">
                            <div>Glissez une image</div>
                            <div>ou cliquez pour sélectionner</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Hidden input field */}
            <input
                ref={refInputImage}
                type="file"
                onChange={handleAddImage}
                disabled={!!imagePreview}
                accept="image/*"
                className="hidden"
                {...others}
            />
        </label>
    );
}
