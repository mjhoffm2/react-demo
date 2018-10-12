using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace React_Demo.Models.Database
{
    public partial class Channel
    {
        public Channel()
        {
            Message = new HashSet<Message>();
            UserChannel = new HashSet<UserChannel>();
        }

        public long ChannelId { get; set; }
        public long? OwnerId { get; set; }
        [Required]
        [StringLength(200)]
        public string DisplayName { get; set; }
        [StringLength(200)]
        public string Description { get; set; }
        public bool IsPublic { get; set; }
        public bool CanAnyoneInvite { get; set; }
        public bool IsGeneral { get; set; }
        public bool IsActiveDirectMessage { get; set; }
        public bool IsSoftDeleted { get; set; }

        [ForeignKey("OwnerId")]
        [InverseProperty("Channel")]
        public User Owner { get; set; }
        [InverseProperty("Channel")]
        public ICollection<Message> Message { get; set; }
        [InverseProperty("Channel")]
        public ICollection<UserChannel> UserChannel { get; set; }
    }
}
