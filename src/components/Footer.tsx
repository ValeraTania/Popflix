import '../css/index.css';

export default function Footer() {
  const currentDate = new Date();
  return (
    <div className='footer'>
      <p>&copy; All rights reserved. {currentDate.getFullYear()}</p>
      <p>
        Movie & TV data powered by IMDb API. Not affiliated with IMDb.
      </p>
    </div>
  );
}
