export default function InfiniteScroll(
    element = document.body,
    onBottom,
    options = {}
) {
    const { root = document, rootMargin = '600px' } = options;

    const $opserver = document.createElement('div');
    element.append($opserver);

    const unobserve = () => {
        observer.unobserve($opserver)
        $opserver.remove();
    };

    const callback = entries => {
        const element = entries[0];

        if (element.isIntersecting) {
            onBottom(unobserve);
        }
    };

    const observer = new IntersectionObserver(callback, {
        root,
        rootMargin,
    });

    observer.observe($opserver);

}