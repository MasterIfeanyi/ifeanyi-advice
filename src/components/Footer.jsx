import React from 'react'

const Foter = () => {

  const today = new Date();


  return (
    <footer className="py-2">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p data-testid="test-footer-text">Chima Ifeanyi &copy; {today.getFullYear()}</p>
          </div>
        </div>
      </div>
    </footer>
    )
}

export default Foter