import './Footer.scss';
function Footer() {
    return (
        <footer class="bg-dark text-white">
            <div class="container p-5 pb-0">
                {/* <!--Grid row--> */}
                <div class="row">
                    {/* <!--Grid column--> */}
                    <div class="col-lg-6 col-md-12 mb-4 mb-md-0" style={{ paddingRight: '2rem' }}>
                        <h5 class="text-uppercase">Về chúng tôi</h5>

                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
                            Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est
                            atque cumque eum delectus sint!
                        </p>
                    </div>
                    {/* <!--Grid column--> */}

                    {/* <!--Grid column--> */}
                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0 \">
                        <h5 class="text-uppercase">Hỗ trợ</h5>

                        <ul class="list-unstyled mb-0">
                            <li>
                                <a href="#!" class="text-white">
                                    Hướng dẫn đặt vé
                                </a>
                            </li>
                            <li>
                                <a href="#!" class="text-white">
                                    Hướng dẫn đăng kí nhà xe
                                </a>
                            </li>
                            <li>
                                <a href="#!" class="text-white">
                                    Câu hỏi thường gặp
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* <!--Grid column--> */}

                    {/* <!--Grid column--> */}
                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0 contact ">
                        <h5 class="text-uppercase ">Liên hệ</h5>
                        {/*  */}
                        <ul class="list-unstyled mb-0">
                            <li>
                                <i class="fas fa-home me-3 text-secondary"></i> 371 Nguyễn Kiệm, TP.HCM
                            </li>
                            <li>
                                <i class="fas fa-envelope me-3 text-secondary"></i>
                                handl@gmail.com
                            </li>
                            <li>
                                <i class="fas fa-phone me-3 text-secondary"></i> + 01 234 567 89
                            </li>
                        </ul>
                    </div>
                    {/* <!--Grid column--> */}
                </div>
                {/* <!--Grid row--> */}
                <section class="mb-4 mt-5">
                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#3b5998' }}
                        href="#!"
                        role="button"
                    >
                        <i class="fab fa-facebook-f"></i>
                    </a>

                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#55acee' }}
                        href="#!"
                        role="button"
                    >
                        <i class="fab fa-twitter"></i>
                    </a>

                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#dd4b39' }}
                        href="#!"
                        role="button"
                    >
                        <i class="fab fa-google"></i>
                    </a>

                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#ac2bac' }}
                        href="#!"
                        role="button"
                    >
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a
                        class="btn text-white btn-floating m-1"
                        style={{ backgroundColor: '#333333' }}
                        href="#!"
                        role="button"
                    >
                        <i class="fab fa-github"></i>
                    </a>
                </section>
            </div>

            <div class="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2022 Copyright: H&L Company
            </div>
        </footer>
    );
}

export default Footer;
