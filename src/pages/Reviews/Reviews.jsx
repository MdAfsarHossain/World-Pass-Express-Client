import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Typewriter } from "react-simple-typewriter";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const Reviews = () => {

    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            // setFlag(true);
            const { data } = await axiosSecure('/reviews');
            // setFlag(false);
            return data;
        }
    })

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>

            <Helmet>
                <title>World Pass Express | Reviews</title>
            </Helmet>

            <div className="mt-10">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center">
                    All{" "}
                    <span className="text-green-600">
                        <Typewriter
                            words={["Reviews"]}
                            loop={0}
                            cursor
                            cursorStyle="_"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </span>{" "}

                </h1>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10 px-5">
                {
                    reviews?.map(review => <ReviewCard
                        key={review?._id}
                        review={review}
                    ></ReviewCard>)
                }
            </div>
        </div>
    );
};

export default Reviews;