"use client";

import Button from "@comps/ui/button";
import Loader from "@comps/ui/loader";
import { combo } from "@lib/combo";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Children,
    cloneElement,
    DetailedReactHTMLElement,
    HTMLAttributes,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useWidth } from "@utils/useWidth";

type ItemNumberType = { minWidth: number; itemAmount: number }[];

type SliderProps = {
    dataListLength: number;
    itemsPerBreakpoint?: ItemNumberType;
    gap?: number;
    paddingX?: number;
    paddingY?: number;
    overflow?: boolean;
    className?: string;
    children: ReactNode;
};

const Slider = (props: SliderProps) => {
    const {
        dataListLength,
        className,
        itemsPerBreakpoint = [
            { minWidth: 0, itemAmount: 1 },
            { minWidth: 768, itemAmount: 2 },
            { minWidth: 1024, itemAmount: 3 },
        ],
        gap = 16,
        paddingX = 8,
        paddingY = 8,
        overflow = false,
        children,
    } = props;

    // Get window width
    const windowWidth = useWidth();

    // Sort breakpoints from highest to lowest for the find method
    const sortedItemsPerBreakpoint = useMemo(
        () => [...itemsPerBreakpoint].sort((a, b) => b.minWidth - a.minWidth),
        [itemsPerBreakpoint],
    );

    // Get the number of items per breakpoint
    const itemNumber = sortedItemsPerBreakpoint.find(({ minWidth }) => (windowWidth ?? 0) >= minWidth)!.itemAmount;

    // Slider states
    const sliderRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    // Draging states
    const [isDragging, setIsDragging] = useState(false);

    // Swipe to left
    const handlePrevious = () => {
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    };

    // Swipe to right
    const handleNext = () => {
        if (currentIndex < dataListLength - itemNumber) setCurrentIndex((prev) => prev + 1);
    };

    // Handle dragging
    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setIsDragging(false);

        const { offset, velocity } = info;

        // Movement
        const velocityX = Math.abs(velocity.x);
        const offsetX = Math.abs(offset.x);

        // Direction
        const toLeft = offset.x > 0;
        const toRight = offset.x < 0;

        // Power
        const power = velocityX * offsetX;
        const limit = 10000;

        // Swipe
        if (toLeft && power > limit) {
            handlePrevious();
        } else if (toRight && power > limit) {
            handleNext();
        }
    };

    // Swipe to right or left on current index changes
    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            const itemWidth = slider.children[0].getBoundingClientRect().width;
            setTranslateX(-currentIndex * (itemWidth + gap));
        }
    }, [windowWidth, currentIndex, gap]); // windowWidth is required to re-position the slider on resize

    // Display a loader until the window width is defined
    if (windowWidth === undefined) {
        return (
            <div className="flex h-40 w-full items-center justify-center gap-3">
                <Loader />
                <span>Loading...</span>
            </div>
        );
    }

    return (
        <div className={combo("relative w-full", className)}>
            {/* Slider container */}
            <motion.div
                // Enable keyboard navigation
                aria-label="Slider"
                role="button"
                tabIndex={0}
                // Control the slider
                ref={sliderRef}
                // Drag
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDrag}
                // Style
                initial={{ transform: `translateX(${translateX}px)` }}
                animate={{ transform: `translateX(${translateX}px)` }}
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                    type: "spring",
                    bounce: 0.2,
                }}
                style={{
                    gap: `${gap}px`,
                    paddingInline: `${paddingX}px`,
                    paddingBlock: `${paddingY}px`,
                    // target children to apply style ?
                }}
                className={combo(
                    "flex flex-row items-stretch justify-start outline-none",
                    overflow && "overflow-hidden",
                    isDragging ? "cursor-grabbing" : "cursor-grab",
                )}
                // Events
                onWheel={(e) => {
                    const delta = e.deltaX;
                    if (delta !== 0) {
                        if (delta > 0) handleNext();
                        else handlePrevious();
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") {
                        handlePrevious();
                    } else if (e.key === "ArrowRight") {
                        handleNext();
                    }
                }}
            >
                {Children.map(children, (child) =>
                    cloneElement(child as DetailedReactHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>, {
                        style: {
                            width: `calc(100% / ${itemNumber} - (${gap}px / (${itemNumber} / ${itemNumber - 1}) ) )`,
                            flexShrink: 0,
                            flexGrow: 0,
                        },
                    }),
                )}
            </motion.div>

            {/* Swipe buttons */}
            <NavButtons
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                currentIndex={currentIndex}
                dataListLength={dataListLength}
                itemNumber={itemNumber}
            />
        </div>
    );
};

export default Slider;

type NavButtonsProps = {
    handlePrevious: () => void;
    handleNext: () => void;
    currentIndex: number;
    dataListLength: number;
    itemNumber: number;
};

const NavButtons = (props: NavButtonsProps) => {
    const { handlePrevious, handleNext, currentIndex, dataListLength, itemNumber } = props;

    return (
        <>
            <Button
                label="Previous"
                onClick={handlePrevious}
                className={combo(
                    "absolute top-1/2 -left-1.5 -translate-y-1/2 rounded-full p-1",
                    currentIndex === 0 && "opacity-50 hover:opacity-50",
                )}
                disabled={currentIndex === 0}
                baseStyleWithout={["padding"]}
            >
                <ChevronLeft className="size-10 -translate-x-px" />
            </Button>
            <Button
                label="Next"
                onClick={handleNext}
                className={combo(
                    "absolute top-1/2 -right-1.5 -translate-y-1/2 rounded-full p-1",
                    currentIndex === dataListLength - itemNumber && "opacity-50 hover:opacity-50",
                )}
                disabled={currentIndex === dataListLength - itemNumber}
                baseStyleWithout={["padding"]}
            >
                <ChevronRight className="size-10 translate-x-px" />
            </Button>
        </>
    );
};
