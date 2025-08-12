'use client'

import { classNames } from '@/lib/utils'
import { useState } from 'react'

type ExpandableDescriptionProps = {
  text: string
  className?: string
}

export default function ExpandableDescription({ text, className = '' }: ExpandableDescriptionProps) {
  const [expanded, setExpanded] = useState(false)
  const needsExpand = text.length > 200

  return (
    <>
      <p className={classNames(
        className,
        !expanded && "line-clamp-4"
      )}>
        {text}
      </p>
      
      {needsExpand && (
        <button 
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </>
  )
}