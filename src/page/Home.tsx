import meme from '../assets/meme.jpg';

function Home() {
    return (
        <>
            <h1>Home page!</h1>
            <div>
                <img src={meme} className="logo" width={"100%"} style={{
                    maxWidth: "500px",
                }} alt="meme" />
            </div>
        </>
    )
}

export default Home;