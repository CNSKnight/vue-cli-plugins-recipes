<template>
    <div class="notifs">
        <p v-for="(notif, idx) in notifications" :key="idx" v-html="infoIcon+' '+notif.error"
            x-html="assemble(notif)" :class="notif.severity || 'info'" :title="notif.service">
            {{notif}}
        </p>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      infoIcon: '<i class="material-icons">info</i>'
    };
  },
  computed: mapGetters(["notifications"])
};
</script>

<style>
.notifs p {
  line-height: 2rem;
  margin-top: 0;
}
.notifs p i {
  float: left;
  margin-right: 0.3em;
  line-height: inherit;
}
.notifs p.info i {
  color: #bdbdbd;
}
.notifs p.warn i {
  color: #ffab00;
}
.notifs p.error i {
  color: #e57373;
}
.notifs p.fatal i {
  color: #b71c1c;
}
</style>
