import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="page">
        <header className="header">
          <img src="../images/Vector.png" alt="Around the us" className="header__vector" />
        </header>
        <main className="main">
          <div className="main__profile">
            <div className="main__content-image">
              <button className="main__profileimg-button">
                <img src="" alt="profile picture" className="main__profile-image" />
                <img src="../images/pencil-svgrepo-com.svg" alt="Edit icon" className="main__pencil-icon" />
              </button>
            </div>
            <div className="main__content-paragraph">
              <h2 className="main__paragraph main__paragraph_name">eros</h2>
              <p className="main__paragraph main__paragraph_job">developer</p>
              <button className="main__button main__button_edit">&#x1F58C;</button>
            </div>
            <button type="button" className="main__button main__button_add">
              &#x1F7A3;
            </button>
          </div>
          <section className="gallery">
          </section>
        </main>
        <footer className="footer">
          &#169; 2025 Around latinoamerica
        </footer>
      </div>
    </>
  )
}

export default App
