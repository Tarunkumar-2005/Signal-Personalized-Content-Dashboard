"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ContentCard } from "@/components/content/ContentCard";
import type { ContentItem } from "@/types";

export function SortableCard({
  item,
  compact = false,
}: {
  item: ContentItem;
  compact?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <ContentCard
        item={item}
        dragHandleProps={{ ...attributes, ...listeners }}
        compact={compact}
      />
    </div>
  );
}
