import {
    AnnotationIcon,
    GlobeAltIcon,
    LightningBoltIcon,
    ScaleIcon
} from '@heroicons/react/outline';

const features = [
    {
        name: 'Gobal Donation',
        description: 'User could choose which charity the money goes to, how much they want to donate, from the donate\'s page. ',
        icon: 1,
    },
    {
        name: 'No hidden fees',
        description: 'Only one fee is charged at the time of money loading that is platform and service fee, which is 10% or ',
        icon: 2,
    },
    {
        name: 'Transfers are instant',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: 3,
    },
    {
        name: 'Mobile notifications',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: 4,
    },
];

export const About = () => {
    return (
        <div className="py-12 bg-antiqueWhite">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-blueGray-600 font-semibold tracking-wide uppercase">
                        About
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-blueGray-900 sm:text-4xl">
                        A better way to donate money
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-blueGray-500 lg:mx-auto">
                        A place for people to connect randomly, and play board
                        games (currently only ludo). So, first you collect money
                        for your pot, at the start of game. After a winner is
                        declared, pot money is transfered to his account, for
                        donating it to the favourite charity.{' '}
                    </p>
                </div>
                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-full bg-blueGray-900 text-white">
                                        <h1
                                            className="h-6 w-6 font-semibold text-center"
                                            aria-hidden="true" >{feature.icon}</h1>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-blueGray-900">
                                        {feature.name}
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-blueGray-500">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};
