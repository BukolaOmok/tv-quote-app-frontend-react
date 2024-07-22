import { useState } from "react";
import axios from "axios";
import TvQuoteDisplay from "./tvQuoteDisplay";
import "./app.css";

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

function App() {
if (!apiBaseURL) {
throw new Error("Missing import.meta.env.VITE_API_BASE_URL");
}

const [tvQuotes, setTVQuotes] = useState([]);
const [newText, setNewText] = useState("");
const [newAuthor, setNewAuthor] = useState("");
const [newShowName, setNewShowName] = useState("");

const fetchTVQuotes = async () => {
    try {
        const url = apiBaseURL + "/quotes";
        const res = await axios.get(url);
        setTVQuotes(res.data);
    } catch (error) {
        console.error("Failed to fetch the tv quotes:", error);
    }
};

const addQuote = async () => {
    try {
        const url = apiBaseURL + "/quotes";
        await axios.post(url, {
            text: newText,
            author: newAuthor,
            show: newShowName,
        });
        fetchTVQuotes(); // Refresh list after adding
    } catch (error) {
        console.error("Failed to add the quote:", error);
    }
};

return (
    <div>
        <h1>Here are quotes from some of your favorite tv shows</h1>
        <button className="button" onClick={fetchTVQuotes}>
            Show Quotes
        </button>
        {tvQuotes.map((tvQuote) => (
            <TvQuoteDisplay
                key={tvQuote.id}
                text={tvQuote.text}
                author={tvQuote.author}
                show={tvQuote.show}
            />
        ))}
        <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Enter quote"
        />
        <textarea
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            placeholder="Enter author"
        />
        <textarea
            value={newShowName}
            onChange={(e) => setNewShowName(e.target.value)}
            placeholder="Enter show name"
        />
        <button className="button" onClick={addQuote}>
            Add A Quote
        </button>
    </div>
);

}

export default App;