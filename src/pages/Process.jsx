import SEO from '../components/SEO'
import ProcessDiagram from '../components/Process'

export default function ProcessPage() {
  return (
    <>
      <SEO
        title="Our Process | Scene Set Studio"
        description="The Scene Framework™ — a 5-act creative process that takes your brand from invisible to inevitable."
      />
      <div style={{ paddingTop: '80px' }}>
        <ProcessDiagram />
      </div>
    </>
  )
}
