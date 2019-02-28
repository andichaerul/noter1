"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var builder_1 = require("tns-core-modules/ui/builder");
var view_1 = require("tns-core-modules/ui/core/view");
var grid_layout_1 = require("tns-core-modules/ui/layouts/grid-layout");
var types_1 = require("tns-core-modules/utils/types");
var utils_1 = require("tns-core-modules/utils/utils");
var index_common_1 = require("./index.common");
__export(require("./index.common"));
var VIEWS_STATES = '_viewStates';
var Carousel = (function (_super) {
    __extends(Carousel, _super);
    function Carousel() {
        var _this = _super.call(this) || this;
        _this._androidViewId = -1;
        _this._indicatorViewId = -1;
        index_common_1.CLog(index_common_1.CLogTypes.info, 'Carousel constructor...');
        _this.CarouselPagerAdapterClass = new CarouselPagerAdapterClassInner(new WeakRef(_this));
        _this.CarouselPageChangedListenerClass = new CarouselPageChangedListener(new WeakRef(_this));
        index_common_1.CLog(index_common_1.CLogTypes.info, "this.CarouselPagerAdapterClass = " + _this.CarouselPagerAdapterClass, "this.CarouselPageChangedListenerClass = " + _this.CarouselPageChangedListenerClass);
        return _this;
    }
    Object.defineProperty(Carousel.prototype, "android", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "adapter", {
        get: function () {
            return this.android.getAdapter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "pageIndicatorCount", {
        set: function (value) {
            if (value) {
                this.adapter.notifyDataSetChanged();
                this._pageIndicatorView.setCount(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Carousel.prototype[index_common_1.indicatorColorProperty.setNative] = function (value) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "indicatorColorProperty.setNative value = " + value);
        if (!value) {
            return;
        }
        this._pageIndicatorView.setSelectedColor(value.android);
    };
    Carousel.prototype[index_common_1.indicatorColorUnselectedProperty.setNative] = function (value) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "indicatorColorUnselectedProperty.setNative value = " + value);
        if (!value) {
            return;
        }
        this._pageIndicatorView.setUnselectedColor(value.android);
    };
    Carousel.prototype[index_common_1.selectedPageProperty.setNative] = function (value) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "selectedPageProperty.setNative value = " + value);
        this.selectedPage = value;
        this.nativeView.setCurrentItem(value);
    };
    Carousel.prototype[index_common_1.indicatorAnimationProperty.setNative] = function (value) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "indicatorAnimationProperty.setNative value = " + value);
        if (!value) {
            return;
        }
        var animationType = com.rd.animation.type.AnimationType.NONE;
        switch (value.toUpperCase()) {
            case 'NONE':
                animationType = com.rd.animation.type.AnimationType.NONE;
                break;
            case 'COLOR':
                animationType = com.rd.animation.type.AnimationType.COLOR;
                break;
            case 'SLIDE':
                animationType = com.rd.animation.type.AnimationType.SLIDE;
                break;
            case 'WORM':
                animationType = com.rd.animation.type.AnimationType.WORM;
                break;
            case 'SCALE':
                animationType = com.rd.animation.type.AnimationType.SCALE;
                break;
            case 'FILL':
                animationType = com.rd.animation.type.AnimationType.FILL;
                break;
            case 'THIN_WORM':
                animationType = com.rd.animation.type.AnimationType.THIN_WORM;
                break;
            case 'DROP':
                animationType = com.rd.animation.type.AnimationType.DROP;
                break;
            case 'SWAP':
                animationType = com.rd.animation.type.AnimationType.SWAP;
                break;
            default:
                animationType = com.rd.animation.type.AnimationType.NONE;
                break;
        }
        if (this._pageIndicatorView) {
            this._pageIndicatorView.setAnimationType(animationType);
        }
    };
    Carousel.prototype[index_common_1.indicatorAnimationDurationProperty.setNative] = function (value) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "indicatorAnimationDurationProperty.setNative value = " + value);
        if (!value) {
            return;
        }
        if (this._pageIndicatorView) {
            this._pageIndicatorView.setAnimationDuration(value);
        }
    };
    Carousel.prototype[index_common_1.indicatorRadiusProperty.setNative] = function (value) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "indicatorRadiusProperty.setNative value = " + value);
        if (!value) {
            return;
        }
        if (this._pageIndicatorView) {
            this._pageIndicatorView.setRadius(value);
        }
    };
    Carousel.prototype[index_common_1.indicatorPaddingProperty.setNative] = function (value) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "indicatorPaddingProperty.setNative value = " + value);
        if (!value) {
            return;
        }
        if (this._pageIndicatorView) {
            this._pageIndicatorView.setPadding(value);
        }
    };
    Carousel.prototype.createNativeView = function () {
        index_common_1.CLog(index_common_1.CLogTypes.info, "Carousel createNativeView");
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        index_common_1.CLog(index_common_1.CLogTypes.info, "this._androidViewId = " + this._androidViewId);
        if (this._indicatorViewId < 0) {
            this._indicatorViewId = android.view.View.generateViewId();
        }
        index_common_1.CLog(index_common_1.CLogTypes.info, "this._indicatorViewId = " + this._indicatorViewId);
        this.nativeView = new android.support.v4.view.ViewPager(this._context);
        this.nativeView.setId(this._androidViewId);
        index_common_1.CLog(index_common_1.CLogTypes.info, "this.nativeView = " + this.nativeView);
        this._pageIndicatorView = new com.rd.PageIndicatorView(this._context);
        this._pageIndicatorView.setId(this._indicatorViewId);
        this._pagerIndicatorLayoutParams = new org.nativescript.widgets.CommonLayoutParams();
        index_common_1.CLog(index_common_1.CLogTypes.info, "this._pageIndicatorView = " + this._pageIndicatorView);
        this.nativeView.setAdapter(this.CarouselPagerAdapterClass);
        this.nativeView.setOnPageChangeListener(this.CarouselPageChangedListenerClass);
        index_common_1.CLog(index_common_1.CLogTypes.info, "Carousel createNativeView returning this.nativeView = " + this.nativeView);
        return this.nativeView;
    };
    Carousel.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        if (this.showIndicator !== false) {
            this._pagerIndicatorLayoutParams.height = android.support.v4.view.ViewPager.LayoutParams.WRAP_CONTENT;
            this._pagerIndicatorLayoutParams.width = android.support.v4.view.ViewPager.LayoutParams.MATCH_PARENT;
            var ar = this.indicatorOffset.split(',');
            var x = ar[0] ? Number(ar[0]) : 0;
            var y = ar[1] ? Number(ar[1]) : 0;
            var defaultVerticalMargin = 25;
            var verticalOffset = utils_1.layout.toDevicePixels(defaultVerticalMargin + (y < 0 ? Math.abs(y) : -Math.abs(y)));
            var horizontalOffset = utils_1.layout.toDevicePixels(x);
            if (this.indicatorAlignment === 'TOP') {
                this._pagerIndicatorLayoutParams.setMargins(horizontalOffset, verticalOffset, 0, 0);
                this._pagerIndicatorLayoutParams.gravity = android.view.Gravity.TOP | android.view.Gravity.CENTER;
            }
            else {
                this._pagerIndicatorLayoutParams.setMargins(horizontalOffset, 0, 0, verticalOffset);
                this._pagerIndicatorLayoutParams.gravity = android.view.Gravity.BOTTOM | android.view.Gravity.CENTER;
            }
            if (this._pageIndicatorView.getParent()) {
                this.parent.android.removeView(this._pageIndicatorView);
            }
            if (this.parent instanceof grid_layout_1.GridLayout) {
                this.parent.android.addView(this._pageIndicatorView, this._pagerIndicatorLayoutParams);
            }
            else {
                this.parent.android.addView(this._pageIndicatorView);
            }
            this._pageIndicatorView.setViewPager(this.nativeView);
            this._pageIndicatorView.setCount(this._childrenCount);
            this._pageIndicatorView.setSelection(this.selectedPage);
        }
    };
    Carousel.prototype.initNativeView = function () {
        this.refresh();
    };
    Carousel.prototype.refresh = function () {
        index_common_1.CLog(index_common_1.CLogTypes.info, "refresh...");
        if (types_1.isNullOrUndefined(this.items) || !types_1.isNumber(this.items.length)) {
            return;
        }
        if (!this.nativeView) {
            return;
        }
        this.removeChildren();
        var length = this.items.length;
        for (var i = 0; i < length; i++) {
            var viewToAdd = !types_1.isNullOrUndefined(this.itemTemplate)
                ? builder_1.parse(this.itemTemplate, this)
                : this._getDefaultItemContent(i);
            var dataItem = this._getDataItem(i);
            viewToAdd.bindingContext = dataItem;
            this.addChild(viewToAdd);
        }
        var adapter = this.nativeView.getAdapter();
        if (adapter) {
            adapter.notifyDataSetChanged();
            this._pageIndicatorView.setCount(this.items.length);
            this.nativeView.setCurrentItem(this.selectedPage);
            this._pageIndicatorView.setSelection(this.selectedPage);
        }
    };
    Carousel.prototype.onLayout = function (left, top, right, bottom) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "onLayout...");
        view_1.View.layoutChild(this, this, 0, 0, right - left, bottom - top);
    };
    Carousel.prototype._getDataItem = function (index) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "_getDataItem...");
        return this.items.getItem ? this.items.getItem(index) : this.items[index];
    };
    Carousel.prototype.onItemsChanged = function (data) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "_onItemsChanged...");
        this.refresh();
    };
    return Carousel;
}(index_common_1.CarouselCommon));
exports.Carousel = Carousel;
var CarouselPagerAdapterClassInner = (function (_super) {
    __extends(CarouselPagerAdapterClassInner, _super);
    function CarouselPagerAdapterClassInner(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    CarouselPagerAdapterClassInner.prototype.getCount = function () {
        var result;
        if (types_1.isNullOrUndefined(this.owner.get().items) || !types_1.isNumber(this.owner.get().items.length)) {
            result = this.owner ? this.owner.get()._childrenCount : 0;
        }
        else {
            result = this.owner ? this.owner.get().items.length : 0;
        }
        index_common_1.CLog(index_common_1.CLogTypes.info, "CarouselPagerAdapterClassInner getCount result = " + result);
        return result;
    };
    CarouselPagerAdapterClassInner.prototype.getItemPosition = function (item) {
        return android.support.v4.view.PagerAdapter.POSITION_NONE;
    };
    CarouselPagerAdapterClassInner.prototype.isViewFromObject = function (view, _object) {
        return view === _object;
    };
    CarouselPagerAdapterClassInner.prototype.instantiateItem = function (container, index) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "CarouselPagerAdapterClassInner instantiateItem...");
        var item = this.owner.get().getChildAt(index);
        if (!item) {
            return null;
        }
        if (item.parent !== this.owner.get()) {
            this.owner.get().addChild(item);
        }
        else {
            item.parent.android.removeView(item.android);
        }
        if (this[VIEWS_STATES]) {
            item.nativeView.restoreHierarchyState(this[VIEWS_STATES]);
        }
        container.addView(item.nativeView, android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT);
        return item.nativeView;
    };
    CarouselPagerAdapterClassInner.prototype.destroyItem = function (container, index, _object) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "CarouselPagerAdapterClassInner destroyItem...");
        var item = this.owner.get().getChildAt(index);
        if (!item) {
            return null;
        }
        var nativeView = item.nativeView;
        container.removeView(nativeView);
    };
    CarouselPagerAdapterClassInner.prototype.saveState = function () {
        index_common_1.CLog(index_common_1.CLogTypes.info, "CarouselPagerAdapterClassInner saveState...");
        if (!this[VIEWS_STATES]) {
            this[VIEWS_STATES] = new android.util.SparseArray();
        }
        var mViewStates = this[VIEWS_STATES];
        var mViewPager = this.owner.get().android;
        var count = mViewPager.getChildCount();
        for (var i = 0; i < count; i++) {
            var c = mViewPager.getChildAt(i);
            if (c.isSaveFromParentEnabled()) {
                c.saveHierarchyState(mViewStates);
            }
        }
        var bundle = new android.os.Bundle();
        bundle.putSparseParcelableArray(VIEWS_STATES, mViewStates);
        return bundle;
    };
    CarouselPagerAdapterClassInner.prototype.restoreState = function (state, loader) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "CarouselPagerAdapterClassInner restoreState...");
        var bundle = state;
        bundle.setClassLoader(loader);
        this[VIEWS_STATES] = bundle.getSparseParcelableArray(VIEWS_STATES);
    };
    return CarouselPagerAdapterClassInner;
}(android.support.v4.view.PagerAdapter));
var CarouselPageChangedListener = (function (_super) {
    __extends(CarouselPageChangedListener, _super);
    function CarouselPageChangedListener(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    CarouselPageChangedListener.prototype.onPageSelected = function (position) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "CarouselPageChangedListener onPageSelected...");
        this.owner.get().notify({
            eventName: index_common_1.CarouselCommon.pageChangedEvent,
            object: this.owner.get(),
            index: position
        });
        this.owner.get().selectedPage = position;
    };
    CarouselPageChangedListener.prototype.onPageScrollStateChanged = function (state) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "CarouselPageChangedListener onPageScrollStateChanged...");
        this.owner.get().notify({
            eventName: index_common_1.CarouselCommon.pageScrollStateChangedEvent,
            object: this.owner.get(),
            state: state
        });
    };
    CarouselPageChangedListener.prototype.onPageScrolled = function (position, positionOffset, positionOffsetPixels) {
        index_common_1.CLog(index_common_1.CLogTypes.info, "CarouselPageChangedListener onPageScrolled...");
        var data = {
            eventName: index_common_1.CarouselCommon.pageScrollingEvent,
            object: this.owner.get(),
            state: {
                offset: positionOffset,
                android: {
                    position: position,
                    positionOffset: positionOffset,
                    positionOffsetPixels: positionOffsetPixels
                }
            }
        };
        this.owner.get().notify(data);
    };
    return CarouselPageChangedListener;
}(android.support.v4.view.ViewPager.SimpleOnPageChangeListener));
//# sourceMappingURL=index.js.map