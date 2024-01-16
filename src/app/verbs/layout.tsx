import Header from "@/components/Header/header"
// import '../../styles/variables.scss'


export default function VerbLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <h1>HELOOOOO LAYOOUTÍ</h1>
        {children}
      </section>
    )
  }