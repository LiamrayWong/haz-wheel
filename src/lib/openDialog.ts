import Dialog from './Dialog.vue';
import {createApp, h} from 'vue';

export const openDialog = (options) => {
  const {title, content, ok, cancel} = options;
  const div = document.createElement('div');//创建div
  document.body.appendChild(div);//div插入到body上
  const close = () => {
    app.unmount(div);
    div.remove();
  };
  const app = createApp({
    render() {
      return h(Dialog, {
        visible: true, 'onUpdate:visible': (newVisible) => {
          if (newVisible === false) {
            close()
          }
        }, ok, cancel
      }, {
        title, content
      });
    }
  });
  app.mount(div);//Dialog挂载到div上
};