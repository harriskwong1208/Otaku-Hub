import '../styles/navbar.css';

export default function Navbar() {
  return (
    <nav>
    <div class="navbar">
      <div class="logo"><a href="#">OtakuHub</a></div>
      <ul class="menu">
        <li><a href="#Home">Home</a></li>
        <li><a href="#About">About</a></li>
        <li><a href="#Category">Category</a></li>
        <li><a href="#Contact">Contact</a></li>
        <li><a href="#Feedback">Feedback</a></li>
      </ul>
    </div>
  </nav>
  );
}