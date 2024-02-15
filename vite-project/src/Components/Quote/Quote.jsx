import './Quote.css';

// Import Title Props
import TitleTypeTwo from '../../UI/TitleTypeTwo/TitleTypeTwo';

// Quote Data props
import { quoteData } from '../../Data/Data';

export default function Quote() {
	return (
		<section className="Quote">
			<div className="container quote-container">
				<TitleTypeTwo Title={'Quote of the Day'} ClassName="quote-title" />

				{quoteData.map(({ quote, speaker }, index) => {
					return (
						<article key={index}>
							<p>{quote}</p>
							<h5>{speaker}</h5>
						</article>
					);
				})}
			</div>
		</section>
	);
}
