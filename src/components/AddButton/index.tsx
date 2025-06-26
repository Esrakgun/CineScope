import * as React from 'react';
import { MdBookmarkAdd, MdBookmarkRemove } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addToList, removeFromList } from '../../redux/listSlice';
import { useToggleWatchListMutation } from '../../redux/api';
import type { Movie } from '../../types/movie';
import type { RootState } from '../../redux/store';

interface AddButtonProps {
  movie: Movie;
}

const AddButton: React.FC<AddButtonProps> = ({ movie }) => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.list.list);
  const isInList = list.some(item => item.id === movie.id);

  const [toggleWatch, { isLoading }] = useToggleWatchListMutation();

  const handleToggle = async () => {
    try {
      await toggleWatch({ movieId: movie.id, isAdd: !isInList }).unwrap();

      if (isInList) {
        dispatch(removeFromList(movie));
      } else {
        dispatch(addToList(movie));
      }
    } catch (err) {
      console.error('Watchlist güncelleme hatası:', err);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
    >
      {isInList ? (
        <>
          <MdBookmarkRemove size={20} /> <span>Listeden Kaldır</span>
        </>
      ) : (
        <>
          <MdBookmarkAdd size={20} /> <span>Listeye Ekle</span>
        </>
      )}
    </button>
  );
};

export default AddButton;
