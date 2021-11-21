<template lang="">
    <div class="a-popup-navigation">
        <div class="a-popup-button btn-menu">
            <svg class="Icon MoreIcon" viewBox="0 0 32 32"><path d="M16,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S14.3,13,16,13z M3,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S1.3,13,3,13z M29,13c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S27.3,13,29,13z"></path></svg>
        </div>
        <div class="a-popup-button btn-vull-screen">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M6472.3,4526.9v-483.1h878.8h881.1L6971.5,2783.1L5713.1,1524.8l349.7-352l352-349.7l1258.4,1258.4l1260.7,1260.6v-881.1v-878.8h483.1H9900v1713.9V5010H8186.2H6472.3V4526.9z"/><path d="M2324.6-1863.8L1066.2-3122.2v881.1v878.8H583.1H100v-1713.8V-4790h1713.8h1713.9v483.1v483.1h-878.8h-881.1L3017-2574.6c685.5,685.5,1246.9,1258.4,1246.9,1269.9c0,13.8-151.8,177.1-340.5,363.5l-338.2,338.2L2324.6-1863.8z"/></g></g>
            </svg>
        </div>
        <div class="a-popup-button btn-close">
            <svg class="Icon CloseIcon" viewBox="0 0 32 32"><path d="M2,14.5h18.4l-7.4-7.4c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l10,10c0.6,0.6,0.6,1.5,0,2.1l-10,10c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l7.4-7.4H2c-0.8,0-1.5-0.7-1.5-1.5C0.5,15.3,1.2,14.5,2,14.5z M28,3.5C28,2.7,28.7,2,29.5,2S31,2.7,31,3.5v25c0,0.8-0.7,1.5-1.5,1.5S28,29.3,28,28.5V3.5z"></path></svg>
        </div>
    </div>
</template>
<script>
export default {
    name: 'todo-popup-navigation',
    props: {
    },
    data: () => ({
    }),
    mounted () {

    },
    methods:{
    },
    components: {
    }
}
</script>
<style scoped lang="scss">
   .a-popup-navigation {
        display: flex;
        justify-content: flex-end;
        .a-popup-button {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 28px;
            min-height: 28px;
            min-width: 28px;
            width: 28px;
            margin-left: 10px;
            cursor: pointer;
            svg {
                width: 16px;
                height: 16px;
                fill: #9bdb9b;
            }
            &:hover {
                background: rgba(21, 7, 38, 0.04);
                border-radius: 6px;
            }
        }
   }
</style>