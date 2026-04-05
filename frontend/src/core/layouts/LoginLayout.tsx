import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div
      style={{
        backgroundImage: "url('/images/loginWallpaper.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: '100vh'
        }}
      >
        {children}
      </div>
    </div>
  );
}