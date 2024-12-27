import meme from "../assets/meme.jpg";

function about() {
    return (
        <>
            <h1>About Page</h1>

            <div>
                <img src={meme} className="logo" width={"100%"} style={{
                    maxWidth: "500px",
                }} alt={"meme"}/>
            </div>
        </>
    )
}

export default about;