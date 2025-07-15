import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import './RoomList.css';
import RoomContainer from './RoomContainer';
import sampleData from '../data/data.json';
import CircularLoader from './Loader/CircularLoader';
import { throttle } from '../clientUtils';

const PAGE_SIZE = 20;
const CARD_HEIGHT = 350; // px, match .card-layout.room-container height in CSS
const CARD_GAP = 20; // px, vertical gap between cards
const ITEM_SIZE = CARD_HEIGHT+CARD_GAP;

function getAllRooms() {
  return (sampleData.rooms_by_serial_no || []).flatMap(serial => serial.rooms);
}

const MemoRoomContainer = memo(RoomContainer);

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const allRooms = useRef(getAllRooms());
  const listRef = useRef();

  // Load more rooms when page changes
  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const nextRooms = allRooms.current.slice(start, end);
        setRooms(prev => [...prev, ...nextRooms]);
        setHasMore(end < allRooms.current.length);
        setLoading(false);
      } catch {
        setError('Failed to load data');
        setLoading(false);
      }
    }, 500);
  }, [page]);

  // Virtualized list: load more when user scrolls near end
  const throttledHandleItemsRendered = useCallback(
    throttle(({ visibleStopIndex }) => {
      if (
        hasMore &&
        !loading &&
        visibleStopIndex >= rooms.length - 3
      ) {
        setPage(prev => prev + 1);
      }
    }, 200), // throttle interval (ms)
    [hasMore, loading, rooms.length]
  );


  // List item renderer
  const Row = ({ index, style }) => {
    if (index < rooms.length) {
      const room = rooms[index];
      return (
        <div style={{ ...style, height: CARD_HEIGHT, marginBottom: CARD_GAP }}>
          <MemoRoomContainer room={room} />
        </div>
      );
    } else if (loading) {
      return (
        <div style={style} className="room-list-loader-row"><CircularLoader /></div>
      );
    } else if (error) {
      return (
        <div style={style} className="error">{error}</div>
      );
    } else if (!hasMore) {
      return (
        <div style={style} className="end-message">No more rooms to load.</div>
      );
    }
    return null;
  };

  // Total items: rooms + 1 for loader/end message
  const itemCount = rooms.length + (loading || error || !hasMore ? 1 : 0);

  return (
    <div className="room-list">
      <List
        height={window.innerHeight - 100} // adjust as needed
        itemCount={itemCount}
        itemSize={ITEM_SIZE}
        width={"100%"}
        onItemsRendered={throttledHandleItemsRendered}
        ref={listRef}
      >
        {Row}
      </List>
    </div>
  );
}

export default RoomList; 