import Router, { Route } from 'preact-router';
import ChzzkEmbedPlayer from './ChzzkEmbedPlayer';

import './app.css'

export function App() {
	return (<Router path={import.meta.env.BASE_URL}>
		<Route path='/:channelId' component={ChzzkEmbedPlayer} />
		<Route default component={GuidePage} />
	</Router>);
}

const GuidePage = () => {
	return <>
		<p>치지직 라이브용 Embed Player 입니다.</p>
		<p>URL<code>/chzzk-embed-player/채널ID</code> 형식으로 접근해주세요</p>
		<p>라이브 외에 다시보기등에서는 동작하지 않습니다.</p>
	</>;
};