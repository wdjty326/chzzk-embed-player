import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import MobileDetect from 'mobile-detect';

import './player.css';

const md = new MobileDetect(window.navigator.userAgent);
const mobile = md.mobile();

interface ChzzkEmbedPlayerProps {
	channelId: string;
}

export const ChzzkEmbedPlayer = ({ channelId }: ChzzkEmbedPlayerProps) => {
	const chzzkIframeRef = useRef<HTMLIFrameElement>(null);
	const [isChanged, setIsChanged] = useState<boolean>(false);

	const href = useMemo(() => `https://${mobile ? 'm.chzzk' : 'chzzk'}.naver.com/live/${channelId}`, [channelId]);

	useEffect(() => {
		if (!chzzkIframeRef.current || mobile) return;
		const observer = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const updated = entry.contentRect.width < 1200;
				if (updated !== isChanged) {
					setIsChanged(updated);
				}
			});
		});
		observer.observe(chzzkIframeRef.current);
		return () => observer.disconnect();
	}, [isChanged]);

	return (<div className="ChzzkPlayer">
		<div className={`ChzzkPlayerWrapper ${mobile ? 'Mobile' : ''}`}>
			<iframe
				className={!mobile && isChanged ? 'Updated' : ''}
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