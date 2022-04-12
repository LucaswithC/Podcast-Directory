import { h } from 'preact';
import { Link } from 'preact-router/match';

const Footer = () => (
	<footer>
		<p class="dimmed">LucaswithC - {new Date().getFullYear()}</p>
		<p class="dimmed">Data from <a href="https://podcastindex.org/">podcastindex.org</a></p>
	</footer>
);

export default Footer;
