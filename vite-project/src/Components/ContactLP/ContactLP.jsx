import './ContactLP.css';

const TeamMember = ({ name, linkedin, github, twitter }) => {
	return (
		<div className="team-member">
			<h2>{name}</h2>
			<div className="social-links">
				<a href={linkedin} target="_blank" rel="noopener noreferrer">
					LinkedIn
				</a>
				<a href={github} target="_blank" rel="noopener noreferrer">
					GitHub
				</a>
				<a href={twitter} target="_blank" rel="noopener noreferrer">
					Twitter
				</a>
			</div>
		</div>
	);
};

export default function ContactLP() {
	const team = [
		{
			name: 'Jessica Asamoah',
			linkedin: 'https://linkedin.com/in/jessica-awuradjoa-asamoah-402ba6191',
			github: 'https://github.com/Jessica-Asamoah',
			twitter: 'https://twitter.com/Awuradjoa_aj',
		},
		// Add more team members here
		{
			name: 'Ato Toffah',
			linkedin: 'https://www.linkedin.com/in/ato-k-toffah/',
			github: 'https://github.com/UnfetteredScholar',
			twitter: 'https://twitter.com/Awuradjoa_aj',
		},

		{
			name: 'Jonathan Irondi',
			linkedin: 'https://www.linkedin.com/in/irondi-jonathan/     ',
			github: 'https://github.com/irondijonathan',
			twitter: 'https://twitter.com/Awuradjoa_aj',
		},
	];

	const projectGithubLink =
		'https://github.com/UnfetteredScholar/ProseHaven.git';

	return (
		<div className="container contact-container">
			<h1>Our Team</h1>
			<div className="team">
				{team.map((member, index) => (
					<TeamMember key={index} {...member} />
				))}
			</div>
			<div>
				<p>
					Check out our project on{' '}
					<a href={projectGithubLink} target="_blank" rel="noopener noreferrer">
						GitHub
					</a>
				</p>
			</div>
		</div>
	);
}
