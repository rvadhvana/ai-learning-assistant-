"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: false;
  };

type ButtonAsChild = CommonProps & {
  asChild: true;
  children: React.ReactElement<any>;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-cta-500 text-white hover:bg-cta-600 shadow-soft",
  secondary: "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-900 hover:bg-slate-100"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base"
};

export function Button(props: ButtonAsButton | ButtonAsChild) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const fullWidth = props.fullWidth ?? false;
  const className = props.className;

  const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);

  if ("asChild" in props && props.asChild) {
    const { children, asChild, variant: _variant, size: _size, fullWidth: _fullWidth, className: _className, ...rest } =
      props;
    const child = children as React.ReactElement<any>;
    return React.cloneElement<any>(child, {
      ...(rest as Record<string, unknown>),
      className: cn(classes, (child.props as any)?.className),
      children: child.props.children
    });
  }

  const {
    asChild,
    variant: _variant,
    size: _size,
    fullWidth: _fullWidth,
    className: _className,
    ...buttonProps
  } = props as ButtonAsButton;
  return <button className={classes} {...buttonProps} />;
}

