import { useUniversal } from "@infodom";

export default () => {

    useUniversal({
        keyword: 'boxcar',
        preview: 'Enter the boxcar',
        verify: () => `For some reason, I can't.`,
        action: 'Intro',
    });
    
}
