export default function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="max-w-[1280px] w-full mx-auto px-5 md:px-6">{children}</div>
}
