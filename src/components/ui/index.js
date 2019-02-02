// @component    : Card
// @content      : CardHeader, CardBody, CardTitle, CardText, CardFooter
// @className    : card
// @desc         : Bootstrap 4 card component.
export {
    Card,       // @props: className, children
    CardHeader, // @props: className, children
    CardBody,   // @props: className, children
    CardTitle,  // @props: className, children, tag
    CardText,   // @props: className, children
    CardFooter  // @props: className, children
} from './card/Card';

// @component    : Error
// @props        : status, message @type: String
// @className    : error-viewer
// @desc         : Error UI component to preview the error messages.
export { Error } from './error/Error';

// @component    : Loading
// @props        : className @type: String
// @className    : loading-viewer
// @desc         : Bootstrap 4.2 Spinner UI component to show loading message
export { Loading } from './loading/Loading';

// @component    : Pagination
// @props        : nextHandler, // @type: function
//                 prevHandler, // @type: function
//                 pagesNumber  // @type: Number
// @className    : pagination
// @desc         : Bootstrap 4 pagination UI component
export { Pagination } from './pagination/Pagination';