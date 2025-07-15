import sampleData from './data/data.json';

export function getAllVariants() {
    const roomsBySerial = sampleData.rooms_by_serial_no || [];
    let variants = [];
    roomsBySerial.forEach(serial => {
        serial.rooms.forEach(room => {
            room.variants.forEach(variant => {
                variants.push({
                    ...variant,
                    roomName: room.name,
                    roomImages: room.properties?.room_images?.[0]?.image_urls || [],
                    videoUrl: room.properties?.video_url?.med || null,
                });
            });
        });
    });
    return variants;
}

export function throttle(func, limit) {
    let inThrottle = false;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

