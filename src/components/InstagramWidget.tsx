import React from 'react'

const InstagramWidget = () => {

  return (
    <>
    <div style={{ textAlign: 'center', padding: '20px 0', background: '#000', color: '#fff', fontSize: '1.5em' }}>
      Join a legendary community
    </div>
    <iframe
    src="//lightwidget.com/widgets/39af4fc774d25c0d9d3329e6b6b94aca.html"
    scrolling="no"
    allowTransparency={true}
    className="lightwidget-widget"
    style={{ width: '100%', border: 0, height: '100vh' }}
  >

  </iframe>
  </>
  )
}

export default InstagramWidget