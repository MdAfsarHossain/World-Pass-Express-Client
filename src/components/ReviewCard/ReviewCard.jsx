import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {

    // console.log(review?.rating);

    return (
        <div class="max-w-sm mx-auto bg-gray-50 shadow-lg rounded-lg overflow-hidden my-5">
            <div class="flex items-center p-5">
                <img class="w-16 h-16 rounded-full object-cover" src={review?.image} alt={review?.name} />
                <div class="ml-4">
                    <h3 class="text-xl font-semibold">{review?.name}</h3>
                    <p class="text-gray-500 text-sm">{review?.location}</p>
                </div>
            </div>

            <div class="px-5 pb-5">
                <p class="text-gray-700 text-base mb-3">
                    {`"${review?.feedback}"`}
                </p>

                <div class="flex items-center space-x-1">
                    <ReactStars
                        count={5}
                        edit={false}
                        size={36}
                        value={review?.rating}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                </div>
            </div>
        </div>



    );
};

export default ReviewCard;