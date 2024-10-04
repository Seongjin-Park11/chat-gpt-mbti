gst-launch-1.0 textoverlay name=overlay font-desc="Sans, 26" ! \
    videoconvert ! ximagesink name=img_test \
    v4l2src name=cam_src ! videoconvert ! videoscale ! video/x-raw,width=640,height=480,format=RGB ! \
    tee name=t_raw \
    t_raw. ! queue ! overlay.video_sink \
    t_raw. ! queue ! videoscale ! video/x-raw,width=224,height=224 ! \
    tensor_converter ! \
    tensor_filter framework=tensorflow-lite \
    model=../../tflite_model/mobilenet_v1_1.0_224_quant.tflite ! \
    tensor_decoder mode=image_labeling \
    option1=../../tflite_model/labels.txt ! \
    overlay.text_sink
 
 gst-launch-1.0 \
    v4l2src ! videoconvert ! videoscale ! video/x-raw,width=640,height=480,format=RGB ! tee name=t \
    t. ! queue leaky=2 max-size-buffers=2 ! videoscale ! video/x-raw,width=300,height=300,format=RGB ! tensor_converter ! \
            tensor_transform mode=arithmetic option=typecast:float32,add:-127.5,div:127.5 ! \
            tensor_filter model=/home/ail/AI_task/nnstreamer/tensor_test/ssd_mobilenet_v2_coco.tflite ! \
            tensor_decoder mode=bounding_boxes option1=mobilenet-ssd option2=/home/ail/AI_task/nnstreamer/tensor_test/coco_labels_list.txt option3=/home/ail/AI_task/nnstreamer/tensor_test/box_priors.txt option4=640:480 option5=300:300 ! \
            compositor name=mix sink_0::zorder=2 sink_1::zorder=1 ! videoconvert n-threads=4 ! ximagesink \
    t. ! queue leaky=2 max-size-buffers=10 ! mix.

    
