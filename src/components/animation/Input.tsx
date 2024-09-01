// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
"use client";

import * as React from "react";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--rose-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        <input
          type={type}
          className={cn(
            `duration-400 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black shadow-input transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-rose-400 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  },
);
Input.displayName = "Input";

// export { Input };
