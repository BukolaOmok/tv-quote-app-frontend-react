export default function TvQuoteDisplay(props) {
    return (
      <div >
        <p>
        {props.text}<br />
        {props.author}<br />
        {props.show}
      </p>
      </div>
      
    );
  }