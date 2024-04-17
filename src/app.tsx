import Router, { Route } from 'preact-router';
import Player from './player';

import './app.css'

export function App() {
	return (<Router path={import.meta.env.BASE_URL}>
		<Route path='/:channelId' component={Player} />
		<Route default component={StartPage} />
	</Router>);
}

const StartPage = () => {
	return <div className="GettingStarted">
		<h3>치지직 라이브 임배드 Player 입니다.</h3>
		<p><a href={`${window.location.origin}${import.meta.env.BASE_URL}`}>{`${window.location.origin}${import.meta.env.BASE_URL}`}:채널주소</a> 형식으로 접근하면 사용 가능합니다.</p>
		<p>CSS로 작성된 페이지이며, Control 중, <b>`넒은 화면(T)`</b> 사용 시 화면이 깨질 수 있습니다.</p>
		<p>라이브 외에 다시보기등 다른 기능은 동작하지 않습니다.</p>
	</div>;
};