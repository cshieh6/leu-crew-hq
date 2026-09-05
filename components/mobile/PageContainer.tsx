export default function PageContainer({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main
      style={{
        padding:20,
        width:"100%",
        maxWidth:1200,
        margin:"0 auto",
        fontFamily:"system-ui"
      }}
    >
      {children}
    </main>
  );
}