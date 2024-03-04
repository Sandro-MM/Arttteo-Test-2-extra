import React, { useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import './App.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);

function App() {

    const skyRef = useRef(null);
    const sunRef = useRef(null);
    const mountainsRef = useRef(null);
    const contentsRef = useRef(null);
    const forestRef = useRef(null);
    const cliffRef = useRef(null);
    const grassRef = useRef(null);
    const rocksRef = useRef(null);

    useEffect(() => {
        const contents = contentsRef.current;
        const mountains = mountainsRef.current;
        const cliff = cliffRef.current;
        const forest = forestRef.current;
        const grass = grassRef.current;
        const rocks = rocksRef.current;

        const screenWidth = window.innerWidth;
        const multiplier = screenWidth / 3260;

        const animationProperties = {
            duration: 3 * multiplier,
            force3D: false,
            overwrite: true,
        };

        const translationValues = {
            contents: 273 * multiplier,
            mountains: 370 * multiplier,
            cliff: 555 * multiplier,
            forest: 240 * multiplier,
            grass: -250 * multiplier,
            rocks: -110 * multiplier,
            logoWrap: 860 * multiplier,
        };

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        });

        timeline.to(contents, {
            y: translationValues.contents,
            ...animationProperties,
        }).to(mountains, {
            y: translationValues.mountains,
            ...animationProperties,
        }, 0).to(cliff, {
            y: translationValues.cliff,
            ...animationProperties,
        }, 0).to(forest, {
            y: translationValues.forest,
            ...animationProperties,
        }, 0).to(grass, {
            y: translationValues.grass,
            ...animationProperties,
        }, 0).to(rocks, {
            y: translationValues.rocks,
            ...animationProperties,
        }, 0);

        timeline.to(contents.querySelector('.logo-wrap'), {
            y: translationValues.logoWrap,
            ...animationProperties,
        }, 0);

        const cleanup = () => {
            if (timeline.scrollTrigger) {
                timeline.scrollTrigger.kill(true);
            }
        };

        return cleanup;
    }, []);



    const textRef = useRef(null);



    const imageRef = useRef(null);
    const topLeavesRef = useRef(null);
    const bottomLeavesRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const image = imageRef.current;
        const topLeaves = topLeavesRef.current;
        const bottomLeaves = bottomLeavesRef.current;
        gsap.set([topLeaves, bottomLeaves], { transformOrigin: 'center' });
        gsap.set(image, { scale: 1 });
        gsap.set(bottomLeaves, { y: '-10%' });
        const zoomIn = () => {
            gsap.to([topLeaves, bottomLeaves], {
                y: "-20%",
                duration: 0.9,
            });
            gsap.to(bottomLeaves, {
                y: "35%",
                duration: 0.9,
            });
            gsap.to(image, {
                scale: 0.89,
                duration: 1.2,
            });
        };
        ScrollTrigger.create({
            trigger: image,
            start: 'center-=30% center',
            onEnter: () => zoomIn(),
        });
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const lineBeforeRef = useRef(null);
    const lineAfterRef = useRef(null);

    const animateLines = () => {
        const lineBefore = lineBeforeRef.current;
        const lineAfter = lineAfterRef.current;

        gsap.to(lineBefore, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power1.inOut',
        });

        gsap.to(lineAfter, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power1.inOut',
        });
    };



    const elementsRef = useRef([]);

    useEffect(() => {
        const lineBefore = lineBeforeRef.current;
        const lineAfter = lineAfterRef.current;

        gsap.set(lineBefore, { opacity: 0, x: -100 });
        gsap.set(lineAfter, { opacity: 0, x: 100 });

        const handleScroll = () => {
            const viewportMiddle = window.innerHeight / 2;
            elementsRef.current.forEach((element, index) => {
                const elementPosition = element.getBoundingClientRect().top;
                const elementMiddle = elementPosition + element.offsetHeight / 2;

                if (elementMiddle - viewportMiddle < 0) {
                    setTimeout(() => {
                        animateLines();
                        element.classList.add("animate");
                    }, index * 100);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const [isPaused, setIsPaused] = useState(false);
    function getRandomPauseDuration() {
        return Math.floor(Math.random() * 10 + 1) * 1000;
    }

    useEffect(() => {
        console.log('3434')
        const timeout = setTimeout(() => {
            setIsPaused(false);
        }, getRandomPauseDuration());

        return () => clearTimeout(timeout);
    }, [isPaused]);

    return (
        <div>
            <div className='palms-top'/>
            <div className="hero-section">
                <div className="hero-section__parallax">
                    <div className="sky parallax-item" ref={skyRef}/>
                    <div className="sun parallax-item" ref={sunRef}/>
                    <div className="mountains parallax-item" ref={mountainsRef}/>
                    <div className="hero-section__contents parallax-item" ref={contentsRef}>
                        <div className={`logo-wrap ${isPaused ? 'pause' : ''}`}
                             onAnimationIteration={() => setIsPaused(true)}/>
                        <div className="hero-section__contents__socials"/>
                    </div>
                    <div className="forest parallax-item" ref={forestRef}/>
                    <div className="cliff parallax-item" ref={cliffRef}/>
                </div>
                <div className="grass parallax-item" ref={grassRef}/>
                <div className="rocks parallax-item" ref={rocksRef}/>
            </div>
            <div className="about-section">
                <div className="about-section__content">
                    <div className="lines-decoration about-section__content__title-wrap">
                        <div ref={lineBeforeRef}  className="line-before">
                            <span className="line"/>
                            <span className="small-ball"/>
                            <span className="big-ball"/>
                        </div>
                        <h1 className="about-section__content__title title-h1 center-text">
                            <div ref={el => elementsRef.current[0] = el} className="single-char title-h1">A</div>
                            <div ref={el => elementsRef.current[1] = el} className="single-char title-h1">b</div>
                            <div ref={el => elementsRef.current[2] = el} className="single-char title-h1">o</div>
                            <div ref={el => elementsRef.current[3] = el} className="single-char title-h1">u</div>
                            <div ref={el => elementsRef.current[4] = el} className="single-char title-h1">t</div>
                        </h1>
                        <div  ref={lineAfterRef} className="line-after">
                            <span className="line"/>
                            <span className="small-ball"/>
                            <span className="big-ball"/>
                        </div>
                    </div>
                    <p className="about-section__content__text desc-2 center-text" ref={textRef}>
                        <span className="desc-2 color-white">Immerse yourself in Chumbi Valley, an enchanting and mystical play-and-earn blockchain</span>
                        <span className="desc-2 color-white">game with intriguing and adorable NFT creatures known as Chumbi. Explore the uncharted</span>
                        <span className="desc-2 color-white">forest, start a farm, grow crops and craft special items with your Chumbi companions</span>
                        <span className="desc-2 color-white">by your side, while earning crypto rewards.</span>
                    </p>
                </div>
                <div className="about-section__image">
                    <div className="leaves-top__wrap" ref={topLeavesRef}/>
                    <div className="about__image" ref={imageRef}/>
                    <div className="leaves-bottom__wrap" ref={bottomLeavesRef}/>
                </div>
            </div>
        </div>
    );
}


export default App;
