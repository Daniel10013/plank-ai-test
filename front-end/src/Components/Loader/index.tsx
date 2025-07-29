import './Loader.css';
import type { LoaderProps } from '../../Types/LoaderProps';

const Loader = ({ height = 100, width = 100, marginTop = 0 }: LoaderProps) => {
  return (
    <div
      className="loader-container"
      style={{ height: `${height}vh`, width: `${width}%`, marginTop: `${marginTop}px`}}
    >
      <div className="spinner" />
      <span>Loading...</span>
    </div>
  );
};

export default Loader;