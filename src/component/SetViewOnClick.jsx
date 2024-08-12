import { useMapEvent } from 'react-leaflet';
function SetViewOnClick({ animateRef }) {
    useMapEvent('click', (e) => {
        const map = e.target;
        map.setView(e.latlng, map.getZoom(), {
            animate: animateRef.current || false,
        });
    });

    return null;
}

export default SetViewOnClick;
