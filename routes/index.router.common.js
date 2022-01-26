export default function indexRouterCommon() {

    function get(req, res, next) {
        return res.json({
            "success": true,
            "version": "1.0.0",
            "routes": {
                "category": '/category',
                "products": '/products'
            }
        })
    }

    return {
        get
    }
}
