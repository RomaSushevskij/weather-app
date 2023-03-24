import { memo } from 'react';

export type IconProps = {
  color?: string;
  width?: number;
  height?: number;
};

const DEFAULT_ICON_SIZE = 800;

export const CloseIcon = memo(({ width, height, color }: IconProps) => {
  return (
    <svg
      width={width ?? DEFAULT_ICON_SIZE}
      height={height ?? DEFAULT_ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Edit / Close_Circle">
        <path
          id="Vector"
          d="M9 9L11.9999 11.9999M11.9999 11.9999L14.9999 14.9999M11.9999 11.9999L9 14.9999M11.9999 11.9999L14.9999 9M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
          stroke={color ?? '#ffffff'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
});
