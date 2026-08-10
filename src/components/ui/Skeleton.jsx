import React from "react";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={`animate-pulse bg-neutral-200/80 rounded-md ${className}`}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-[2.25rem] p-4 border border-border-brand/40 h-full w-full">
      {/* Image box */}
      <Skeleton className="aspect-square w-full rounded-[1.75rem] mb-5" />
      {/* Title block */}
      <Skeleton className="h-6 w-3/4 rounded-full mb-3" />
      {/* Category block */}
      <Skeleton className="h-4 w-1/4 rounded-full mb-4" />
      {/* Description lines */}
      <div className="space-y-2 mb-6">
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-5/6 rounded-full" />
      </div>
      {/* Footer row (price + cart button) */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <Skeleton className="h-5 w-1/4 rounded-full" />
        <Skeleton className="h-9 w-28 rounded-full" />
      </div>
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="bg-white min-h-screen pt-8 pb-24 animate-in fade-in duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs skeleton */}
        <div className="flex gap-2 mb-8">
          <Skeleton className="h-4 w-12 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-28 rounded-full" />
        </div>
        
        {/* Columns split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Images) */}
          <div className="lg:col-span-6 w-full flex flex-col">
            <Skeleton className="aspect-[4/3.8] w-full rounded-[2.25rem] mb-4" />
            <div className="flex gap-3">
              <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl" />
              <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl" />
              <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl" />
            </div>
          </div>
          
          {/* Right Column (Details panels) */}
          <div className="lg:col-span-6 w-full flex flex-col">
            {/* Category */}
            <Skeleton className="h-4 w-20 rounded-full mb-3" />
            {/* Title */}
            <Skeleton className="h-10 w-3/4 rounded-full mb-4" />
            {/* Rating */}
            <Skeleton className="h-5 w-24 rounded-full mb-6" />
            {/* Price */}
            <Skeleton className="h-7 w-28 rounded-full mb-8" />
            {/* Description lines */}
            <div className="space-y-3 mb-8">
              <Skeleton className="h-3 w-full rounded-full" />
              <Skeleton className="h-3 w-full rounded-full" />
              <Skeleton className="h-3 w-4/5 rounded-full" />
            </div>
            
            {/* Variant options */}
            <div className="mb-6 space-y-2">
              <Skeleton className="h-4 w-16 rounded-full" />
              <div className="flex gap-3">
                <Skeleton className="h-9 w-16 rounded-full" />
                <Skeleton className="h-9 w-16 rounded-full" />
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8 space-y-2">
              <Skeleton className="h-4 w-16 rounded-full" />
              <div className="flex gap-3">
                <Skeleton className="h-9 w-20 rounded-full" />
                <Skeleton className="h-9 w-20 rounded-full" />
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4 border-y border-neutral-100 py-6 mb-8">
              <Skeleton className="h-12 flex-1 rounded-full" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
