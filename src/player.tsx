import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import MobileDetect from 'mobile-detect';

import './player.css';

const md = new MobileDetect(window.navigator.userAgent, 520);
const mdv = md.mobile() !== null;

interface ChzzkEmbedPlayerProps {
	channelId: string;
}

export const ChzzkEmbedPlayer = ({ channelId }: ChzzkEmbedPlayerProps) => {
	const chzzkIframeRef = useRef<HTMLIFrameElement>(null);
	const [mobile, setMobile] = useState<boolean>(mdv);
	const [changed, setChanged] = useState<boolean>(false);

	const href = useMemo(() => `https://${mobile ? 'm.chzzk' : 'chzzk'}.naver.com/live/${channelId}`, [mobile, channelId]);

	useEffect(() => {
		if (!chzzkIframeRef.current || mdv) return;
		const observer = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const changeUpdated = entry.contentRect.width < 1200;
				const mobileUpdated = entry.contentRect.width < 950;
				if (changeUpdated !== changed) {
					setChanged(changeUpdated);
				} else if (mobileUpdated !== mobile) {
					setMobile(mobileUpdated);
				}
			});
		});
		observer.observe(chzzkIframeRef.current);
		return () => observer.disconnect();
	}, [changed, mobile]);

	return (<div className="ChzzkPlayer"	>
		<div className={`ChzzkPlayerWrapper ${mobile ? 'Mobile' : ''}`}>
			<iframe
				className={!mobile && changed ? 'Updated' : ''}
				ref={chzzkIframeRef}
				src={href}
				frameBorder={0}
				scrolling="no"
				allowFullScreen={true}
				crossOrigin="anonymous"
			></iframe>
		</div>
	</div>);
};
export default ChzzkEmbedPlayer;