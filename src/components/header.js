import { h } from 'preact';
import { Link } from 'preact-router/match';

const Header = () => (
	<header>
		<h1>Podcast Directory</h1>
		<nav>
			<Link class="pill" activeClassName="" href="/">Your Favorites</Link>
		</nav>
	</header>
);

export default Header;
