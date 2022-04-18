import { h } from 'preact';
import { Link } from 'preact-router/match';

const Footer = () => (
	<footer>
		<p>LucaswithC - {new Date().getFullYear()}</p>
		<p>Data from <a href="https://podcastindex.org/">podcastindex.org</a></p>
	</footer>
);

export default Footer;
