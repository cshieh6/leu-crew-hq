export default function SectionTitle({
  children
}:{
  children: React.ReactNode
}) {
  return (
    <h3
      style={{
        marginTop:0,
        marginBottom:15
      }}
    >
      {children}
    </h3>
  );
}